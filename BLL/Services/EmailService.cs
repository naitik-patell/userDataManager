using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using UserData.Repository.DTO;
using UserData.Services.Interface;

namespace UserData.Services.Services
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;
        public EmailService(SmtpSettings smtpSettings)
        {
            _smtpSettings = smtpSettings;
        }
        public void SendEmail(string to, string subject, string userName)
        {
            string path = "C:\\Users\\pca16\\Desktop\\user data Project\\DAL\\EmailBodies\\RegisteredUserMailBody.cshtml";
            string emailBody = File.ReadAllText(path);
            emailBody = emailBody.Replace("{{UserName}}", userName)
                     .Replace("{{LoginLink}}", "http://localhost:4200/user-data/login");
            try
            {
                using (var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port))
                {
                    client.EnableSsl = _smtpSettings.EnableSSL;
                    client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
                        Subject = subject,
                        Body = emailBody,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(to);
                    client.Send(mailMessage);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        public void SendForgotPasswdMail(string to, string subject, string token)
        {
            string path = "C:\\Users\\pca16\\Desktop\\user data Project\\DAL\\EmailBodies\\ForgotPasswdMailBody.cshtml";
            string emailBody = File.ReadAllText(path);
            emailBody = emailBody.Replace("{{ResetLink}}", "http://localhost:4200/user-data/reset-password?token=" + token);
            try
            {
                using (var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port))
                {
                    client.EnableSsl = _smtpSettings.EnableSSL;
                    client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
                        Subject = subject,
                        Body = emailBody,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(to);
                    client.Send(mailMessage);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void SendEmailWithAttachment(string to, string subject, string body, List<string> filesToSend)
        {
            try
            {
                using (var client = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port))
                {
                    client.EnableSsl = _smtpSettings.EnableSSL;
                    client.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.SenderEmail, _smtpSettings.SenderName),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(to);
                    foreach (var file in filesToSend)
                    {
                        string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", file);
                        if (System.IO.File.Exists(filePath))
                        {
                            var attachment = new Attachment(filePath);
                            mailMessage.Attachments.Add(attachment);
                        }
                    }
                    client.Send(mailMessage);
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
