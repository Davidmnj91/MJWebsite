<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $table = 'clients';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

}
