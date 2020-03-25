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
        public class SampleDataController : Controller {
            private HomeContext dbContext;
            public SampleDataController(HomeContext context)
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

                Airport airportInDB = dbContext.Airports.Include(a => a.Runways).FirstOrDefault(a => a.AirportId == airportId);
                return airportInDB;
            }
            [HttpGet ("runways/{airportId}")]
            public List<Runway> getRunways(int airportId)
            {

                List<Runway> RunwaysForAirport = dbContext.Runways.Where(r => r.AirportId == airportId).ToList();
                return RunwaysForAirport;
            }
        }
}