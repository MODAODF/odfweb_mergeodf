<?php

declare(strict_types=1);

namespace OCA\TemplateRepo\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version201000Date20190111132839 extends SimpleMigrationStep {
	public function name(): string {
		return 'Add templaterepo_acl table';
	}

	public function description(): string {
		return 'Adds table to store ACL information for template repo';
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('merge_odf_acl')) {
			$table = $schema->createTable('merge_odf_acl');
			$table->addColumn('acl_id', 'bigint', [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 6,
			]);
			$table->addColumn('fileid', 'bigint', [
				'notnull' => true,
			]);
			$table->addColumn('mapping_type', 'string', [
				'notnull' => true,
				'length' => 16,
			]);
			$table->addColumn('mapping_id', 'string', [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('mask', 'smallint', [
				'notnull' => true,
			]);
			$table->addColumn('permissions', 'smallint', [
				'notnull' => true,
			]);
			$table->setPrimaryKey(['acl_id']);
			$table->addIndex(['mapping_type', 'mapping_id'], 'templates_repo_acl_mapping');
			$table->addUniqueIndex(['fileid', 'mapping_type', 'mapping_id'], 'templates_repo_acl_unique');
		}

		return $schema;
	}
}
