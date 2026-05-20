<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query\SelectQuery;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Leads Model
 *
 * @method \App\Model\Entity\Lead newEmptyEntity()
 * @method \App\Model\Entity\Lead newEntity(array $data, array $options = [])
 * @method array<\App\Model\Entity\Lead> newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Lead get(mixed $primaryKey, array|string $finder = 'all', \Psr\SimpleCache\CacheInterface|string|null $cache = null, \Closure|string|null $cacheKey = null, mixed ...$args)
 * @method \App\Model\Entity\Lead findOrCreate($search, ?callable $callback = null, array $options = [])
 * @method \App\Model\Entity\Lead patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method array<\App\Model\Entity\Lead> patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Lead|false save(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method \App\Model\Entity\Lead saveOrFail(\Cake\Datasource\EntityInterface $entity, array $options = [])
 * @method iterable<\App\Model\Entity\Lead>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Lead>|false saveMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Lead>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Lead> saveManyOrFail(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Lead>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Lead>|false deleteMany(iterable $entities, array $options = [])
 * @method iterable<\App\Model\Entity\Lead>|\Cake\Datasource\ResultSetInterface<\App\Model\Entity\Lead> deleteManyOrFail(iterable $entities, array $options = [])
 */
class LeadsTable extends Table
{
    /**
     * Initialize method
     *
     * @param array<string, mixed> $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('leads');
        $this->setDisplayField('lead_type');
        $this->setPrimaryKey('id');
        $this->addBehavior('Muffin/Trash.Trash', [
            'field' => 'deleted_at'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->scalar('lead_type')
            ->maxLength('lead_type', 255)
            ->allowEmptyString('lead_type');

        $validator
            ->scalar('step')
            ->maxLength('step', 255)
            ->allowEmptyString('step');

        $validator
            ->scalar('open_close')
            ->maxLength('open_close', 255)
            ->allowEmptyString('open_close');

        $validator
            ->scalar('tag')
            ->maxLength('tag', 255)
            ->allowEmptyString('tag');

        $validator
            ->scalar('source')
            ->maxLength('source', 255)
            ->allowEmptyString('source');

        $validator
            ->scalar('sub_source')
            ->maxLength('sub_source', 255)
            ->allowEmptyString('sub_source');

        $validator
            ->scalar('sales_person')
            ->maxLength('sales_person', 255)
            ->allowEmptyString('sales_person');

        $validator
            ->scalar('split_deal_user')
            ->maxLength('split_deal_user', 255)
            ->allowEmptyString('split_deal_user');

        $validator
            ->scalar('first_name')
            ->maxLength('first_name', 255)
            ->notEmptyString('first_name');

        $validator
            ->scalar('middle_name')
            ->maxLength('middle_name', 255)
            ->allowEmptyString('middle_name');

        $validator
            ->scalar('last_name')
            ->maxLength('last_name', 255)
            ->notEmptyString('last_name');

        $validator
            ->scalar('company_name')
            ->maxLength('company_name', 255)
            ->allowEmptyString('company_name');

        $validator
            ->email('email')
            ->allowEmptyString('email');

        $validator
            ->scalar('alternate_email')
            ->maxLength('alternate_email', 255)
            ->allowEmptyString('alternate_email');

        $validator
            ->scalar('cell')
            ->maxLength('cell', 255)
            ->allowEmptyString('cell');

        $validator
            ->scalar('phone')
            ->maxLength('phone', 255)
            ->allowEmptyString('phone');

        $validator
            ->scalar('work_number')
            ->maxLength('work_number', 255)
            ->allowEmptyString('work_number');

        $validator
            ->scalar('fax')
            ->maxLength('fax', 255)
            ->allowEmptyString('fax');

        $validator
            ->scalar('address')
            ->maxLength('address', 255)
            ->notEmptyString('address');

        $validator
            ->scalar('address_line_2')
            ->maxLength('address_line_2', 255)
            ->allowEmptyString('address_line_2');

        $validator
            ->scalar('country')
            ->maxLength('country', 255)
            ->allowEmptyString('country');

        $validator
            ->scalar('city')
            ->maxLength('city', 255)
            ->allowEmptyString('city');

        $validator
            ->scalar('state_province')
            ->maxLength('state_province', 255)
            ->allowEmptyString('state_province');

        return $validator;
    }
}
