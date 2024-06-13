using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UserData.Repository.DataModels;

[Table("country")]
public partial class Country
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Column("isdeleted")]
    public bool? Isdeleted { get; set; }

    [Column("createddate", TypeName = "timestamp without time zone")]
    public DateTime Createddate { get; set; }

    [Column("modifieddate", TypeName = "timestamp without time zone")]
    public DateTime? Modifieddate { get; set; }

    [Column("deleteddate", TypeName = "timestamp without time zone")]
    public DateTime? Deleteddate { get; set; }

    [Column("description")]
    [StringLength(250)]
    public string? Description { get; set; }

    [Column("flag_url")]
    [StringLength(250)]
    public string? FlagUrl { get; set; }

    [InverseProperty("Country")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
