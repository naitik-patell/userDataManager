using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UserData.Repository.DataModels;

[Table("gender")]
public partial class Gender
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("gender")]
    [StringLength(10)]
    public string Gender1 { get; set; } = null!;

    [InverseProperty("GenderNavigation")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
