using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PicnicPlanner3.Contexts;
using PicnicPlanner3.Models;

namespace PicnicPlanner3.Controllers {
        [Produces ("application/json")]
        [Route ("api")]
        public class HomeController : Controller {
            private HomeContext dbContext;
            public HomeController(HomeContext context)
            {
                dbContext = context;
            }


            [HttpGet ("airports")]
            public List<Airport> airports()
            {
                List<Airport> AllAirports = dbContext.Airports.Where(a => a.Type != "closed" && a.Type!="heliport").OrderBy(a => a.Name).ToList();
                return AllAirports;
            }


            [HttpGet ("airport/{airportId}")]
            public Airport ShowAirport(int airportId)
            {

                Airport airportInDB = dbContext.Airports.FirstOrDefault(a => a.AirportId == airportId);
                return airportInDB;
            }


            [HttpGet ("airport/search/{search}")]
            public List<Airport> SearchAirport(string search)
            {

                List<Airport> SearchedAirports = dbContext.Airports.Where(a => a.Name.Contains(search) || a.Region.Contains(search) || a.Municipality.Contains(search)).ToList();
                return SearchedAirports;
            }


            [HttpGet ("runways/{airportId}")]
            public List<Runway> getRunways(int airportId)
            {

                List<Runway> RunwaysForAirport = dbContext.Runways.Where(r => r.AirportId == airportId).ToList();
                return RunwaysForAirport;
            }
        }
}