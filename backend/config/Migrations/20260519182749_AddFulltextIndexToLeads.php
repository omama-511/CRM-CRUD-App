<?php
declare(strict_types=1);

use Migrations\BaseMigration;

class AddFulltextIndexToLeads extends BaseMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/migrations/5/en/migrations.html#the-change-method
     *
     * @return void
     */
    public function up(): void
    {
        $this->execute("ALTER TABLE leads ADD FULLTEXT INDEX search_idx (first_name, last_name, company_name, email, phone)");
    }

    public function down(): void
    {
        $this->execute("ALTER TABLE leads DROP INDEX search_idx");
    }
}
