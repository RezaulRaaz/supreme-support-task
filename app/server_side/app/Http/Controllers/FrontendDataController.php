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

    public function distance(Request $request){
        $fromLat=$request->lat;
        $fromLong=$request->lng;
        $id=$request->id;


        // $fromLat='-41.1109041';
        // $fromLong='146.8376087';
        // $id=328222;
        $locations=LocationData::all()->except($id);
        $location_list=[];
        foreach($locations as $location){
            $toLat=$location->lat;
            $toLng=$location->lng;

            $km =$this->distanceCalculate($toLat,$toLng,$fromLat,$fromLong,"K");
            if($km <= 50){
                $data=[
                    'location'=>$location,
                    'km'=>$km
                ];
                array_push($location_list,$data);
            }

        }
        $response = [
            'success' => true,
            'data' => $location_list,
            'message' => '',
        ];
        return response()->json($response, 200);
    }

    function distanceCalculate($lat1, $lon1, $lat2, $lon2, $unit) {

        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            return round($miles * 1.609344);
        } else if ($unit == "N") {
            return round($miles * 0.8684);
        } else {
            return round($miles);
        }
      }
}
