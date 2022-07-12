using ManterCursosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CadastrosCursosAPI.Models
{
    public class ManterCursosContext : DbContext
    {
        public ManterCursosContext(DbContextOptions<ManterCursosContext> options) : base(options)
        {

        }

        public DbSet<Curso> Cursos {  get; set;}
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}
