using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PicnicPlanner3.Models
{
    public class Airport
    {
        public int AirportId{get; set;}
        public string Type{get; set;}
        public string Ident {get; set;}
        public string Name {get; set;}
        public double Latitude_deg {get; set;}
        public double Longitude_deg {get; set;}
        public string Region {get; set;}
        public string Municipality {get; set;}
        public List<Runway> Runways{get; set;}
    }
}