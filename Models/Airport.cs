using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PicnicPlanner3.Models
{
    public class Airport
    {
        public string AirportId{get; set;}
        public string Type{get; set;}
        public string Ident {get; set;}
        public string Name {get; set;}
        public string Latitude_deg {get; set;}
        public string Longitude_deg {get; set;}
        public string Region {get; set;}
        public string Municipality {get; set;}
    }
}