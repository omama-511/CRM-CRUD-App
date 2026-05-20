<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Lead Entity
 *
 * @property int $id
 * @property string $lead_type
 * @property string $step
 * @property string $open_close
 * @property string $tag
 * @property string $source
 * @property string $sub_source
 * @property string $sales_person
 * @property string $split_deal_user
 * @property string $first_name
 * @property string $middle_name
 * @property string $last_name
 * @property string $company_name
 * @property string $email
 * @property string $alternate_email
 * @property string $cell
 * @property string $phone
 * @property string $work_number
 * @property string $fax
 * @property string $address
 * @property string $address_line_2
 * @property string $country
 * @property string $city
 * @property string $state_province
 */
class Lead extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array<string, bool>
     */
    protected array $_accessible = [
        'id' => false,
        'lead_type' => true,
        'step' => true,
        'open_close' => true,
        'tag' => true,
        'source' => true,
        'sub_source' => true,
        'sales_person' => true,
        'split_deal_user' => true,
        'first_name' => true,
        'middle_name' => true,
        'last_name' => true,
        'company_name' => true,
        'email' => true,
        'alternate_email' => true,
        'cell' => true,
        'phone' => true,
        'work_number' => true,
        'fax' => true,
        'address' => true,
        'address_line_2' => true,
        'country' => true,
        'city' => true,
        'state_province' => true,
    ];
}
