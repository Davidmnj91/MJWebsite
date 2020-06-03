<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function showAllClients()
    {
        return response()->json(Client::all());
    }

    public function showOneClient($id)
    {
        return response()->json(Client::find($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, ['name' => 'required|unique:clients']);

        $client = Client::create($request->all());

        return response()->json($client, 201);
    }

    public function update($id, Request $request)
    {
        $client = Client::findOrFail($id);
        $client->update($request->all());

        return response()->json($client, 200);
    }

    public function delete($id)
    {
        Client::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
