<?php
declare(strict_types=1);

namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * LeadsFixture
 */
class LeadsFixture extends TestFixture
{
    /**
     * Init method
     *
     * @return void
     */
    public function init(): void
    {
        $this->records = [
            [
                'id' => 1,
                'lead_type' => 'Lorem ipsum dolor sit amet',
                'step' => 'Lorem ipsum dolor sit amet',
                'open_close' => 'Lorem ipsum dolor sit amet',
                'tag' => 'Lorem ipsum dolor sit amet',
                'source' => 'Lorem ipsum dolor sit amet',
                'sub_source' => 'Lorem ipsum dolor sit amet',
                'sales_person' => 'Lorem ipsum dolor sit amet',
                'split_deal_user' => 'Lorem ipsum dolor sit amet',
                'first_name' => 'Lorem ipsum dolor sit amet',
                'middle_name' => 'Lorem ipsum dolor sit amet',
                'last_name' => 'Lorem ipsum dolor sit amet',
                'company_name' => 'Lorem ipsum dolor sit amet',
                'email' => 'Lorem ipsum dolor sit amet',
                'alternate_email' => 'Lorem ipsum dolor sit amet',
                'cell' => 'Lorem ipsum dolor sit amet',
                'phone' => 'Lorem ipsum dolor sit amet',
                'work_number' => 'Lorem ipsum dolor sit amet',
                'fax' => 'Lorem ipsum dolor sit amet',
                'address' => 'Lorem ipsum dolor sit amet',
                'address_line_2' => 'Lorem ipsum dolor sit amet',
                'country' => 'Lorem ipsum dolor sit amet',
                'city' => 'Lorem ipsum dolor sit amet',
                'state_province' => 'Lorem ipsum dolor sit amet',
            ],
        ];
        parent::init();
    }
}
