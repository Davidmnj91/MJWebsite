<?php


namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{

    public function showAllProjects()
    {
        return response()->json(Project::with(['Photos', 'Client'])->get());
    }

    public function showOneProject($id)
    {
        return response()->json(Project::with(['Photos', 'Client'])->find($id));
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:projects',
            'order' => 'numeric|unique:projects',
            'cover' => 'required|image'
        ]);

        $file = $request->file('cover');
        $random_name = Str::random(8);
        $destinationPath = 'projects/';
        $extension = $file->getClientOriginalExtension();
        $filename = $random_name . '_cover.' . $extension;
        $request->file('cover')->move($destinationPath, $filename);

        $project = Project::create([
            'name' => $request->get('name'),
            'order' => $request->get('order'),
            'client_id' => $request->get('client_id'),
            'cover' => $filename
        ]);

        return response()->json($project, 201);
    }

    public function update($id, Request $request)
    {
        $project = Project::findOrFail($id);
        $project->update($request->all());

        return response()->json($project, 200);
    }

    public function delete($id)
    {
        Project::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

}
