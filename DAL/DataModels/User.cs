using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UserData.Repository.DataModels;

[Table("User")]
[Index("Email", Name = "User_email_key", IsUnique = true)]
[Index("Username", Name = "User_username_key", IsUnique = true)]
public partial class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("firstname")]
    [StringLength(100)]
    public string Firstname { get; set; } = null!;

    [Column("lastname")]
    [StringLength(100)]
    public string Lastname { get; set; } = null!;

    [Column("email")]
    [StringLength(100)]
    public string Email { get; set; } = null!;

    [Column("phone")]
    [StringLength(20)]
    public string Phone { get; set; } = null!;

    [Column("username")]
    [StringLength(100)]
    public string Username { get; set; } = null!;

    [Column("password")]
    [StringLength(100)]
    public string Password { get; set; } = null!;

    [Column("countryid")]
    public int? Countryid { get; set; }

    [Column("gender")]
    public int? Gender { get; set; }

    [Column("birthdate")]
    public DateOnly Birthdate { get; set; }

    [Column("streetaddress")]
    [StringLength(150)]
    public string Streetaddress { get; set; } = null!;

    [Column("isdeleted")]
    public bool Isdeleted { get; set; }

    [Column("createddate", TypeName = "timestamp without time zone")]
    public DateTime Createddate { get; set; }

    [Column("modifieddate", TypeName = "timestamp without time zone")]
    public DateTime? Modifieddate { get; set; }

    [Column("deleteddate", TypeName = "timestamp without time zone")]
    public DateTime? Deleteddate { get; set; }

    [Column("deletedby")]
    public int? Deletedby { get; set; }

    [ForeignKey("Countryid")]
    [InverseProperty("Users")]
    public virtual Country? Country { get; set; }

    [ForeignKey("Gender")]
    [InverseProperty("Users")]
    public virtual Gender? GenderNavigation { get; set; }
}
