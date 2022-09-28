using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(query,
            productParams.PageNumber, productParams.PageSize);
            //เพื่อส่งค่ำกำรแบ่งหน้ำไปให้Axios Interceptor น ำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);
            return Ok(products);
        }


        // [HttpGet("[action]")]
        // public async Task<ActionResult> TestGetProduct()
        // {
        //     return Ok( await _context.Products.ToListAsync());
        // }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(); //ส่งไปให้Axios Interceptor
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่ำนค่ำที่ซ ้ำกันมำเพียงค่ำเดียว
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new { brands, types });
        }

    }
}