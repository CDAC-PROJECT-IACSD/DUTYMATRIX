using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DutyMatrix.LoggerService.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public long Uid { get; set; }

        [Column("user_name")]
        public string Uname { get; set; } = string.Empty;

        [Column("user_email")]
        public string Uemail { get; set; } = string.Empty;

        [Column("user_phoneNo")]
        public string UphoneNo { get; set; } = string.Empty;

        [Column("user_password")]
        public string Upassword { get; set; } = string.Empty;

        public UserRank Urank { get; set; }
        public UserRole Urole { get; set; }

        public long StationId { get; set; }
        public Station Station { get; set; } = null!;
    }
}
