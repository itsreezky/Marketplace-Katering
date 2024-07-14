<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Invoice;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
        ]);

        if ($user->customer) {
            $user->customer->update([
                'company_name' => $request->company,
                'contact' => $request->contact,
                'address' => $request->address,
            ]);
        } else {
            Customer::create([
                'user_id' => $user->id,
                'company_name' => $request->company,
                'contact' => $request->contact,
                'address' => $request->address,
            ]);
        }

        return response()->json(['customer' => $user->load('customer')], 200);
    }

    public function searchCatering(Request $request)
    {
        $query = Menu::query();

        if ($request->has('location')) {
            $query->whereHas('merchant', function($q) use ($request) {
                $q->where('address', 'like', '%' . $request->location . '%');
            });
        }

        if ($request->has('food_type')) {
            $query->where('description', 'like', '%' . $request->food_type . '%');
        }

        $menus = $query->get();

        return response()->json(['menus' => $menus], 200);
    }

    public function placeOrder(Request $request)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'required|date',
        ]);

        $order = Order::create([
            'customer_id' => Auth::id(),
            'menu_id' => $request->menu_id,
            'quantity' => $request->quantity,
            'delivery_date' => $request->delivery_date,
        ]);

        $menu = Menu::findOrFail($request->menu_id);
        $total_price = $menu->price * $request->quantity;

        $invoice = Invoice::create([
            'order_id' => $order->id,
            'total_price' => $total_price,
        ]);

        return response()->json(['message' => 'Order placed successfully', 'order' => $order, 'invoice' => $invoice], 201);
    }

    public function viewInvoice($id)
    {
        $invoice = Invoice::where('order_id', $id)->firstOrFail();

        return response()->json(['invoice' => $invoice], 200);
    }
}
