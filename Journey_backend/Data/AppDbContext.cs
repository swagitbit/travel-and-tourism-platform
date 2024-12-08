using System.Reflection;
using Journey.Dtos;
using Journey.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Journey.Data
{
    public class AppDbContext: IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }

        public DbSet<Listings> Listings { get; set; }
        public DbSet<ReviewRating> ReviewRating { get; set; }
        public DbSet<SearchQuery> SearchQuery { get; set; }
        public DbSet<Booking>  Booking { get; set; }
        public DbSet<CityLocation> CityLocation { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>()
            .Property(b => b.TotalPrice)
            .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Listings>()
            .Property(l => l.PriceRange)
            .HasColumnType("decimal(18,2)");

           modelBuilder.Entity<ReviewRating>()
            .Property(l => l.Rating)
            .HasColumnType("decimal(18,2)");

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Activity>()
                .Property(a => a.Price)
                .HasColumnType("decimal(18,2)");


        }

    }
}
