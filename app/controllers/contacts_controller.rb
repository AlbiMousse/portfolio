class ContactsController < ApplicationController
  skip_forgery_protection only: [:create]

  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      # Send the email
      ContactMailer.contact_email(
        contact_params[:name],
        contact_params[:email],
        contact_params[:subject],
        contact_params[:message]
      ).deliver_now
      
      render json: { success: true, message: t('contact.form.success') }, status: :ok
    else
      render json: { success: false, errors: @contact.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :subject, :message)
  end
end
