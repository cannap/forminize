CREATE TABLE `accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`refresh_token_expires_in` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `fields` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`required` boolean NOT NULL DEFAULT false,
	`neightbot_from` varchar(255),
	`label` varchar(255) NOT NULL,
	`placeholder` varchar(255),
	`side` enum('left','right','none') DEFAULT 'none');
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`user_id` varchar(255),
	`title` varchar(255) NOT NULL,
	`description` varchar(512),
	`status` enum('draft','published','archived') DEFAULT 'draft');
--> statement-breakpoint
CREATE TABLE `sessions` (
	`sessionToken` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp,
	`image` varchar(255));
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	PRIMARY KEY(`identifier`,`token`)
);
