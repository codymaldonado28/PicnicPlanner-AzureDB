using System.ComponentModel.DataAnnotations;

namespace PicnicPlanner3.Models
{
    public class Runway
    {
        public int RunwayId {get; set;}
        public int Le_Heading_deg {get; set;}
        public int He_Heading_deg {get; set;}
        public int AirportId {get; set;}
    }
}