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
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $lead->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $lead->id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Leads'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column column-80">
        <div class="leads form content">
            <?= $this->Form->create($lead) ?>
            <fieldset>
                <legend><?= __('Edit Lead') ?></legend>
                <?php
                    echo $this->Form->control('lead_type');
                    echo $this->Form->control('step');
                    echo $this->Form->control('open_close');
                    echo $this->Form->control('tag');
                    echo $this->Form->control('source');
                    echo $this->Form->control('sub_source');
                    echo $this->Form->control('sales_person');
                    echo $this->Form->control('split_deal_user');
                    echo $this->Form->control('first_name');
                    echo $this->Form->control('middle_name');
                    echo $this->Form->control('last_name');
                    echo $this->Form->control('company_name');
                    echo $this->Form->control('email');
                    echo $this->Form->control('alternate_email');
                    echo $this->Form->control('cell');
                    echo $this->Form->control('phone');
                    echo $this->Form->control('work_number');
                    echo $this->Form->control('fax');
                    echo $this->Form->control('address');
                    echo $this->Form->control('address_line_2');
                    echo $this->Form->control('country');
                    echo $this->Form->control('city');
                    echo $this->Form->control('state_province');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
