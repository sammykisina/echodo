CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`date` integer NOT NULL,
	`description` text DEFAULT '',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`done` integer DEFAULT 0
);
