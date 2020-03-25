using Microsoft.EntityFrameworkCore;
using PicnicPlanner3.Models;

namespace PicnicPlanner3.Contexts
{
    public class HomeContext: DbContext
    {
        public HomeContext(DbContextOptions options) : base(options){}
        public DbSet<Airport> Airports {get; set;}
        public DbSet<Runway> Runways{get; set;}
    }
}