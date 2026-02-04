using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DutyMatrix.LoggerService.Models
{
    [Table("history")]
    public class History
    {
        [Key]
        [Column("history_id")]
        public long Hid { get; set; }

        // enum stored as STRING in MySQL
        [Column("haction_type")]
        public ActionType HactionType { get; set; }

        [Column("history_time_stamp")]
        public DateTime HtimeStamp { get; set; }

        [Column("history_action_description")]
        public string HactionDescription { get; set; } = string.Empty;

        [Column("user_id")]
        public long UserId { get; set; }

        // navigation property (NOT sent in JSON)
        [JsonIgnore]
        public User? User { get; set; }
    }
}
