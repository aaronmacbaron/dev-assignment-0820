using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace nude_assignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataPersistenceController : ControllerBase
    {

        public DataPersistenceController()
        {
          
        }

        [HttpGet]
        public String Get()
        {
            return "1234";
        }
    }
}
