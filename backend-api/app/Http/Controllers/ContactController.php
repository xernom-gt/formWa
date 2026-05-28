<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    //
    public function send(Request $request) {
        $request->validate([
            'nama' => 'required|string|max:50',
            'email' => 'required|email',
            'keperluan' => 'required|string',
            'pesan' => 'required|string',
        ]);

        $teks = "Halo Cahya, Perkenalkan nama saya $request->nama \n\n";
        $teks .= "email : $request->email \n\n";
        $teks .= "keperluan : $request->keperluan \n\n";
        $teks .= "pesan :\n$request->pesan";

        $nomorWA = env('WHATSAPP');
        $waLink = 'https://wa.me/' . $nomorWA . '?text=' . urlencode($teks);

        return response()->json([
            'message' => 'success',
            'link_wa' => $waLink,
        ]);
    }
}
