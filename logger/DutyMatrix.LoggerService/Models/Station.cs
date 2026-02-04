using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DutyMatrix.LoggerService.Models
{
    [Table("stations")]
    public class Station
    {
        [Key]
        [Column("station_id")]
        public long Sid { get; set; }

        [Column("station_name")]
        public string Sname { get; set; } = string.Empty;

        [Column("station_contact")]
        public string Scontact { get; set; } = string.Empty;

        [Column("station_location")]
        public string Sloc { get; set; } = string.Empty;
    }
}
