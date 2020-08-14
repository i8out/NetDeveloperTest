﻿using NetDeveloperTest.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetDeveloperTest.Interfaces
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
