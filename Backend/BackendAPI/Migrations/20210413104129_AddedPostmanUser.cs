using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AddedPostmanUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "LastName", "Login", "Name", "PasswordHash" },
                values: new object[] { 5, "PostmanUserLastName", "PostmanUser", "PostmanUserName", "b1acfbe7c73da3f39089a6d184981e65d746f6f3c66a271c371921e3ee0872ba" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 5);
        }
    }
}
