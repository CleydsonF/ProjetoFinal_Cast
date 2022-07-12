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
                return NotFound($"Curso não encontrado com o ID informado ({id}).");
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
                if (!CursoExiste(id))
                {
                    return NotFound(0);
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
                if (curso.DataInicio.Date < DateTime.Now.Date)
                {
                    return BadRequest(new { mensagem = "A data de início não pode ser anterior à data de hoje" });
                }

                if (curso.Datatermino.Date < curso.DataInicio.Date)
                {
                    return BadRequest(new { mensagem = "A data de término não pode ser anterior à data de início" });
                }

                Boolean existeCursoMesmoPreiodo = (_context.Cursos.Any(c => c.DataInicio <= curso.DataInicio && c.Datatermino >= curso.DataInicio || c.DataInicio == curso.DataInicio && c.Datatermino == curso.Datatermino));

                if (existeCursoMesmoPreiodo == true)
                {

                    return BadRequest(new { mensagem = "Existe(m) curso(s) planejados(s) dentro do período informado." });

                }
                Curso duplicate = VeficarDuplicidade(curso);

                if (duplicate != default && duplicate.CursoID != 0)
                {
                    return BadRequest(new { message = "Curso já cadastrado." });
                }
                else
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

                    return Ok(new { mensagem = "Dados gravados com sucesso!!" });

                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Ocorreu um erro inesperado.", error = ex.Message, stackTrace = ex.StackTrace });
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

            if (curso.Datatermino <= DateTime.Now)
            {
                return BadRequest("Este curso já foi realizado, ou está em andamento, portanto não pode ser excluído!");
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

        Curso VeficarDuplicidade(Curso curso)
        {
            Curso duplicatedCourse = _context.Cursos.Where(c =>
              (c.DescricaoCurso.ToLower() == curso.DescricaoCurso.ToLower())
              && c.DescricaoCurso != curso.DescricaoCurso).FirstOrDefault();

            return curso;
        }
        private bool CursoExiste(int id)
        {
            return _context.Cursos.Any(e => e.CursoID == id);
        }
    }

}
