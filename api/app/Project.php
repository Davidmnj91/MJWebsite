<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $table = 'projects';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'order', 'client_id', 'cover'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function Client()
    {
        return $this->hasOne('clients');
    }

    public function Photos()
    {
        return $this->has_many('photos');
    }
}
