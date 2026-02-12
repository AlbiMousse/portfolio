class ContactMailer < ApplicationMailer
  default from: ENV['MAILER_FROM'] || 'noreply@portfolio.local'

  def contact_email(name, email, subject, message)
    @name = name
    @email = email
    @subject = subject
    @message = message
    
    mail(
      to: ENV['CONTACT_EMAIL'] || 'albanmoussa.estienne@gmail.com',
      subject: "New Contact Form Submission: #{subject} from #{name}",
      reply_to: email,
      body: message
    )
  end
end
