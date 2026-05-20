<?php
/**
 * @var \App\View\AppView $this
 * @var iterable<\App\Model\Entity\Lead> $leads
 */
?>
<div class="leads index content">
    <?= $this->Html->link(__('New Lead'), ['action' => 'add'], ['class' => 'button float-right']) ?>
    <h3><?= __('Leads') ?></h3>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th><?= $this->Paginator->sort('id') ?></th>
                    <th><?= $this->Paginator->sort('lead_type') ?></th>
                    <th><?= $this->Paginator->sort('step') ?></th>
                    <th><?= $this->Paginator->sort('open_close') ?></th>
                    <th><?= $this->Paginator->sort('tag') ?></th>
                    <th><?= $this->Paginator->sort('source') ?></th>
                    <th><?= $this->Paginator->sort('sub_source') ?></th>
                    <th><?= $this->Paginator->sort('sales_person') ?></th>
                    <th><?= $this->Paginator->sort('split_deal_user') ?></th>
                    <th><?= $this->Paginator->sort('first_name') ?></th>
                    <th><?= $this->Paginator->sort('middle_name') ?></th>
                    <th><?= $this->Paginator->sort('last_name') ?></th>
                    <th><?= $this->Paginator->sort('company_name') ?></th>
                    <th><?= $this->Paginator->sort('email') ?></th>
                    <th><?= $this->Paginator->sort('alternate_email') ?></th>
                    <th><?= $this->Paginator->sort('cell') ?></th>
                    <th><?= $this->Paginator->sort('phone') ?></th>
                    <th><?= $this->Paginator->sort('work_number') ?></th>
                    <th><?= $this->Paginator->sort('fax') ?></th>
                    <th><?= $this->Paginator->sort('address') ?></th>
                    <th><?= $this->Paginator->sort('address_line_2') ?></th>
                    <th><?= $this->Paginator->sort('country') ?></th>
                    <th><?= $this->Paginator->sort('city') ?></th>
                    <th><?= $this->Paginator->sort('state_province') ?></th>
                    <th class="actions"><?= __('Actions') ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($leads as $lead): ?>
                <tr>
                    <td><?= $this->Number->format($lead->id) ?></td>
                    <td><?= h($lead->lead_type) ?></td>
                    <td><?= h($lead->step) ?></td>
                    <td><?= h($lead->open_close) ?></td>
                    <td><?= h($lead->tag) ?></td>
                    <td><?= h($lead->source) ?></td>
                    <td><?= h($lead->sub_source) ?></td>
                    <td><?= h($lead->sales_person) ?></td>
                    <td><?= h($lead->split_deal_user) ?></td>
                    <td><?= h($lead->first_name) ?></td>
                    <td><?= h($lead->middle_name) ?></td>
                    <td><?= h($lead->last_name) ?></td>
                    <td><?= h($lead->company_name) ?></td>
                    <td><?= h($lead->email) ?></td>
                    <td><?= h($lead->alternate_email) ?></td>
                    <td><?= h($lead->cell) ?></td>
                    <td><?= h($lead->phone) ?></td>
                    <td><?= h($lead->work_number) ?></td>
                    <td><?= h($lead->fax) ?></td>
                    <td><?= h($lead->address) ?></td>
                    <td><?= h($lead->address_line_2) ?></td>
                    <td><?= h($lead->country) ?></td>
                    <td><?= h($lead->city) ?></td>
                    <td><?= h($lead->state_province) ?></td>
                    <td class="actions">
                        <?= $this->Html->link(__('View'), ['action' => 'view', $lead->id]) ?>
                        <?= $this->Html->link(__('Edit'), ['action' => 'edit', $lead->id]) ?>
                        <?= $this->Form->postLink(
                            __('Delete'),
                            ['action' => 'delete', $lead->id],
                            [
                                'method' => 'delete',
                                'confirm' => __('Are you sure you want to delete # {0}?', $lead->id),
                            ]
                        ) ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->first('<< ' . __('first')) ?>
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
            <?= $this->Paginator->last(__('last') . ' >>') ?>
        </ul>
        <p><?= $this->Paginator->counter(__('Page {{page}} of {{pages}}, showing {{current}} record(s) out of {{count}} total')) ?></p>
    </div>
</div>