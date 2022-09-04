<?php

namespace App\Http\Controllers;

use App\Models\LocationData;
use Illuminate\Http\Request;

class FrontendDataController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        if ($validated) {
            $locationData = LocationData::create([
                'title' => $request->title,
                'address' => $request->address,
                'suburb' => $request->suburb,
                'state' => $request->state,
                'zip' => $request->zip,
                'lat' => $request->lat,
                'lng' => $request->lng,
            ]);
            if ($locationData) {
                $response = [
                    'success' => true,
                    'data' => $locationData,
                    'message' => 'Data Store Successfully',
                ];

                return response()->json($response, 201);
            }
        }
        return response()->json('Data Not Store Successfuly', 500);
    }

    public function get_location_data()
    {
        $data = LocationData::all([
            'id',
            'title',
            'address',
            'suburb',
            'state',
            'zip',
            'lat',
            'lng',
        ]);

        if ($data) {
            $response = [
                'success' => true,
                'data' => $data,
                'message' => 'Data List',
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'success' => false,
                'data' => [],
                'message' => 'Data Not Found',
            ];
            return response()->json($response, 500);
        }
    }

    public function single_location_data($id){
        $data = LocationData::where('id',$id)->first();
        if ($data) {
            $response = [
                'success' => true,
                'data' => $data,
                'message' => '',
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'success' => false,
                'data' => [],
                'message' => 'Data Not Found',
            ];
            return response()->json($response, 500);
        }
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'lat' => 'required',
            'lng' => 'required',
        ]);

        if ($validated) {
            $locationData = LocationData::where('id',$request->id)->update([
                'title' => $request->title,
                'address' => $request->address,
                'suburb' => $request->suburb,
                'state' => $request->state,
                'zip' => $request->zip,
                'lat' => $request->lat,
                'lng' => $request->lng,
            ]);
            if ($locationData) {
                $response = [
                    'success' => true,
                    'data' => $locationData,
                    'message' => 'Data Updated Successfully',
                ];

                return response()->json($response, 201);
            }
        }
        return response()->json('Data Not Update Successfuly', 500);
    }

    public function delete($id){
        $locationData = LocationData::where('id',$id)->delete();
        if ($locationData) {
            $response = [
                'success' => true,
                'message' => 'Data Deleted Successfully',
            ];

            return response()->json($response, 201);
        }

        return response()->json('Data Not Deleted Successfuly', 500);
    }
}
