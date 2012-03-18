﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oak;

namespace BorrowedGames.Models
{
    public class Registration : DynamicModel
    {
        Users users = new Users();

        public Registration()
            : this(new { })
        {
        }

        public Registration(object entity)
            : base(entity)
        {
        }

        public IEnumerable<dynamic> Validates()
        {
            yield return
            new Presence("Email");

            yield return
            new Format("Email")
            {
                With = @"^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$"
            };

            yield return
            new Uniqueness("Email", users) { ErrorMessage = "Email is unavailable." };

            yield return
            new Presence("Password");

            yield return
            new Confirmation("Password") { ErrorMessage = "Passwords do not match." };
        }

        public void Register()
        {
            users.Insert(this.Exclude("PasswordConfirmation"));
        }
    }
}