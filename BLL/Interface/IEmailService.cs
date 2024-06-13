using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserData.Services.Interface
{
    public interface IEmailService
    {
        public void SendEmail(string to, string subject, string body);
        public void SendForgotPasswdMail(string to, string subject, string token);
        void SendEmailWithAttachment(string to, string subject, string body, List<string> filesToSend);
    }
}
