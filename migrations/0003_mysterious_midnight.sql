CREATE TABLE "room_redesigns" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"original_image_url" text NOT NULL,
	"modified_image_url" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"design_style" text NOT NULL,
	"additional_details" text,
	"room_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "room_redesigns" ADD CONSTRAINT "room_redesigns_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;