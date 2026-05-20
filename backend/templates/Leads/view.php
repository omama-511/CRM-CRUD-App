<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Lead $lead
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('Edit Lead'), ['action' => 'edit', $lead->id], ['class' => 'side-nav-item']) ?>
            <?= $this->Form->postLink(__('Delete Lead'), ['action' => 'delete', $lead->id], ['confirm' => __('Are you sure you want to delete # {0}?', $lead->id), 'class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('List Leads'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
            <?= $this->Html->link(__('New Lead'), ['action' => 'add'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column column-80">
        <div class="leads view content">
            <h3><?= h($lead->lead_type) ?></h3>
            <table>
                <tr>
                    <th><?= __('Lead Type') ?></th>
                    <td><?= h($lead->lead_type) ?></td>
                </tr>
                <tr>
                    <th><?= __('Step') ?></th>
                    <td><?= h($lead->step) ?></td>
                </tr>
                <tr>
                    <th><?= __('Open Close') ?></th>
                    <td><?= h($lead->open_close) ?></td>
                </tr>
                <tr>
                    <th><?= __('Tag') ?></th>
                    <td><?= h($lead->tag) ?></td>
                </tr>
                <tr>
                    <th><?= __('Source') ?></th>
                    <td><?= h($lead->source) ?></td>
                </tr>
                <tr>
                    <th><?= __('Sub Source') ?></th>
                    <td><?= h($lead->sub_source) ?></td>
                </tr>
                <tr>
                    <th><?= __('Sales Person') ?></th>
                    <td><?= h($lead->sales_person) ?></td>
                </tr>
                <tr>
                    <th><?= __('Split Deal User') ?></th>
                    <td><?= h($lead->split_deal_user) ?></td>
                </tr>
                <tr>
                    <th><?= __('First Name') ?></th>
                    <td><?= h($lead->first_name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Middle Name') ?></th>
                    <td><?= h($lead->middle_name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Last Name') ?></th>
                    <td><?= h($lead->last_name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Company Name') ?></th>
                    <td><?= h($lead->company_name) ?></td>
                </tr>
                <tr>
                    <th><?= __('Email') ?></th>
                    <td><?= h($lead->email) ?></td>
                </tr>
                <tr>
                    <th><?= __('Alternate Email') ?></th>
                    <td><?= h($lead->alternate_email) ?></td>
                </tr>
                <tr>
                    <th><?= __('Cell') ?></th>
                    <td><?= h($lead->cell) ?></td>
                </tr>
                <tr>
                    <th><?= __('Phone') ?></th>
                    <td><?= h($lead->phone) ?></td>
                </tr>
                <tr>
                    <th><?= __('Work Number') ?></th>
                    <td><?= h($lead->work_number) ?></td>
                </tr>
                <tr>
                    <th><?= __('Fax') ?></th>
                    <td><?= h($lead->fax) ?></td>
                </tr>
                <tr>
                    <th><?= __('Address') ?></th>
                    <td><?= h($lead->address) ?></td>
                </tr>
                <tr>
                    <th><?= __('Address Line 2') ?></th>
                    <td><?= h($lead->address_line_2) ?></td>
                </tr>
                <tr>
                    <th><?= __('Country') ?></th>
                    <td><?= h($lead->country) ?></td>
                </tr>
                <tr>
                    <th><?= __('City') ?></th>
                    <td><?= h($lead->city) ?></td>
                </tr>
                <tr>
                    <th><?= __('State Province') ?></th>
                    <td><?= h($lead->state_province) ?></td>
                </tr>
                <tr>
                    <th><?= __('Id') ?></th>
                    <td><?= $this->Number->format($lead->id) ?></td>
                </tr>
            </table>
        </div>
    </div>
</div>