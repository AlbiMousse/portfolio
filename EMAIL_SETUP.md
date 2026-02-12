# Email Setup Guide

Your contact form is now fully integrated with email functionality! Here's what's been set up and what you need to do to make it work.

## What's Been Configured

✅ **Contact Model** - Stores contact submissions with validations
✅ **Contacts Controller** - Handles form submissions with JSON responses  
✅ **Contact Mailer** - Sends emails using ActionMailer
✅ **Routes** - POST /contacts endpoint configured
✅ **Database Migration** - Ready to create contacts table
✅ **Form UI** - Updated with email field and submission handling
✅ **Localization** - English and French translations added

## Setup Steps

### Step 1: Run Database Migration

```bash
rails db:migrate
```

This creates the `contacts` table to store form submissions.

### Step 2: Set Environment Variables

Copy `.env.example` to `.env` and fill in your email details:

```bash
cp .env.example .env
```

Then edit `.env` and set:
- `CONTACT_EMAIL` - Your email address (where you'll receive contact submissions)
- `MAILER_FROM` - Sender email address (can be noreply@yourdomain.com)

### Step 3: For Development - Use Letter Opener

For testing locally without SMTP setup, use the `letter_opener` gem:

```ruby
# In Gemfile
gem 'letter_opener', group: :development
```

Then run:
```bash
bundle install
```

And add to `config/environments/development.rb`:
```ruby
config.action_mailer.delivery_method = :letter_opener
config.action_mailer.perform_deliveries = true
```

When you submit a form in development, emails will open automatically in your browser!

### Step 4: For Production - Configure SMTP

Edit `config/environments/production.rb` and uncomment/configure:

```ruby
config.action_mailer.smtp_settings = {
  user_name: ENV['SMTP_USERNAME'],
  password: ENV['SMTP_PASSWORD'],
  address: ENV['SMTP_ADDRESS'],
  port: ENV['SMTP_PORT'],
  authentication: :plain,
  enable_starttls_auto: true
}

config.action_mailer.default_url_options = { host: 'yourdomain.com' }
config.action_mailer.perform_deliveries = true
config.action_mailer.raise_delivery_errors = true
```

Then set the SMTP environment variables in your production environment.

**For Gmail:**
- SMTP_ADDRESS: `smtp.gmail.com`
- SMTP_PORT: `587`
- SMTP_USERNAME: Your Gmail email
- SMTP_PASSWORD: [App password](https://support.google.com/accounts/answer/185833) (not your regular password!)

**For Other Providers:**
Check their SMTP documentation.

## How It Works

1. User fills out the contact form
2. JavaScript validates form locally
3. Submits to `/contacts` endpoint via fetch
4. ContactsController validates and saves to database
5. ContactMailer sends email asynchronously
6. User sees success/error message

## Files Modified

- `app/models/contact.rb` - New model with validations
- `app/controllers/contacts_controller.rb` - Form submission handler
- `app/mailers/contact_mailer.rb` - Email sender
- `app/views/contact_mailer/contact_email.html.erb` - Email template
- `app/views/shared/_contact.html.erb` - Updated form with JavaScript
- `config/routes.rb` - Added POST /contacts route
- `config/locales/en.yml` - Added translation keys
- `config/locales/fr.yml` - Added French translation keys
- `db/migrate/20240101000001_create_contacts.rb` - Database schema
- `.env.example` - Environment variable template

## Testing

1. Start your Rails server
2. Visit the portfolio site
3. Scroll to Contact section
4. Fill in the form and submit
5. In development: Email opens in browser (with letter_opener)
6. In production: Email sent to CONTACT_EMAIL address

## Troubleshooting

**Email not being sent?**
- Check Rails logs: `tail -f log/development.log`
- Ensure environment variables are set correctly
- Verify SMTP credentials are correct

**Form not submitting?**
- Check browser console for JavaScript errors
- Verify CSRF token is present in HTML
- Check network tab to see POST request

**Validation errors?**
- Email field must be a valid email format
- All fields are required
- Subject must be at least 5 characters
- Message must be at least 10 characters

## Next Steps

After setup, consider:
- Monitoring contact submissions in the database
- Adding email notifications for successful submissions
- Implementing spam protection (e.g., reCAPTCHA)
- Setting up email rate limiting to prevent abuse
