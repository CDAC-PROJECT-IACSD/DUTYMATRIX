using Microsoft.EntityFrameworkCore;
using DutyMatrix.LoggerService.Models;

namespace DutyMatrix.LoggerService.Data
{
    public class LoggerDbContext : DbContext
    {
        public LoggerDbContext(DbContextOptions<LoggerDbContext> options)
            : base(options)
        {
        }

        public DbSet<History> Histories { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<History>()
                .Property(h => h.HactionType)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(u => u.Urole)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(u => u.Urank)
                .HasConversion<string>();
        }
    }
}
