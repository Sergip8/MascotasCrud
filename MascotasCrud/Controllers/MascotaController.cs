using AutoMapper;
using MascotasCrud.Models;
using MascotasCrud.Models.DTO;
using MascotasCrud.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MascotasCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly IMascotaRepository _mascotaRepository;
        private readonly IMapper _mapper;

        public MascotaController(IMapper mapper, IMascotaRepository mascotaRepository)
        {
            
            _mapper = mapper;   
            _mascotaRepository = mascotaRepository; 
        }   

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                
                var lista = await _mascotaRepository.GetListMascotas();
                var listaMascotasDto = _mapper.Map<IEnumerable<MascotaDTO>>(lista);
                return Ok(listaMascotasDto);
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            try
            {
               
                var mascota = await _mascotaRepository.GetMascota(id);
                if(mascota == null)
                {
                    return NotFound();
                }

                var mascotaDto = _mapper.Map<MascotaDTO>(mascota);
                return Ok(mascotaDto);
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var mascota = await _mascotaRepository.GetMascota(id);

                if(mascota == null)
                {
                    return NotFound();
                }
                await _mascotaRepository.DeleteMascota(mascota);

            return NoContent();
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }

        [HttpPost]

        public async Task<IActionResult> AgregarMacota(MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);

                mascota.FechaCreacion = DateTime.Now;

                var mascotaI = await _mascotaRepository.AddMascota(mascota);

                var mascotaInDto = _mapper.Map<MascotaDTO>(mascotaI);
                return CreatedAtAction("Get", new { id = mascotaInDto.Id }, mascotaInDto);
           
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditarMascota(int id, MascotaDTO mascotaDto)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDto);

                if (id != mascota.Id)
                {
                    return BadRequest("La mascota");
                }
                var mascotaItem = await _mascotaRepository.GetMascota(id);

                if(mascotaItem == null)
                {
                    return NotFound();
                }

                await _mascotaRepository.UpdateMascota(mascota, mascotaItem);

                return Ok();
            }
            catch (Exception err)
            {

                return BadRequest(err.Message);
            }

        }
    }
}
