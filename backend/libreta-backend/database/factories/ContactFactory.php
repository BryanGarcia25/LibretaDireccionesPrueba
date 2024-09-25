<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this -> faker -> name(),
            'notes' => $this -> faker -> sentence(),
            'birthday' => $this -> faker -> date(),
            'website' => $this -> faker -> url(),
            'company' => $this -> faker -> company()
        ];
    }
}
