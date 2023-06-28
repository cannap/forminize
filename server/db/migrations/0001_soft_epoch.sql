ALTER TABLE `fields` ADD `form_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `fields` ADD `type` enum('text','number') NOT NULL;