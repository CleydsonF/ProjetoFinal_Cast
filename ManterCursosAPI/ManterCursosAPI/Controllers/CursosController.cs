using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CadastrosCursosAPI.Models;
using ManterCursosAPI.Models;

namespace ManterCursosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {

        private readonly ManterCursosContext _context;

        public CursosController(ManterCursosContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _context.Cursos.ToListAsync();
        }

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // PUT: api/Cursos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            if (id != curso.CursoID)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            Log log = new Log
            {
                DataInclusao = DateTime.Now,
                UltimaAtualizacao = DateTime.Now,
                Acao = "Curso Atualizado",
                UsuarioID = 1,
                Curso = curso.DescricaoCurso
            };

            _context.Logs.Add(log);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Cursos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            try
            {
               Boolean existeCursoMesmoPreiodo = ( _context.Cursos.Any( c => c.DataInicio <= curso.Datatermino && c.Datatermino >= curso.DataInicio || c.DataInicio == curso.DataInicio && c.Datatermino == curso.Datatermino));

                if(existeCursoMesmoPreiodo == true){

                     return BadRequest(new {mensagem = "Existe(m) curso(s) planejados(s) dentro do período informado."});

                }else
                {
                    _context.Cursos.Add(curso);
                    await _context.SaveChangesAsync();
                    Log log = new Log
                    {
                        DataInclusao = DateTime.Now,
                        UltimaAtualizacao = DateTime.Now,
                        Acao = "Curso Cadastrado",
                        UsuarioID = 1,
                        Curso = curso.DescricaoCurso
                    };

                    _context.Logs.Add(log);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetCurso", new { id = curso.CursoID }, curso);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { erro = ex.Message, Caminho = ex.StackTrace, IDCategoria = curso.CategoriaID });
            }
        }

        // DELETE: api/Cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
           
            if (curso == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();
            Log log = new Log()
            {
                DataInclusao = DateTime.Now,
                UltimaAtualizacao = DateTime.Now,
                Acao = "Curso Deletado",
                UsuarioID = 1,
                Curso = curso.DescricaoCurso
            };

            _context.Logs.Add(log);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CursoExists(int id)
        {
            return _context.Cursos.Any(e => e.CursoID == id);
        }
    }
}
