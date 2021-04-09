using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class HashedPasswords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                maxLength: 64,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "PasswordHash",
                value: "e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2,
                column: "PasswordHash",
                value: "1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 3,
                column: "PasswordHash",
                value: "3acb59306ef6e660cf832d1d34c4fba3d88d616f0bb5c2a9e0f82d18ef6fc167");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4,
                column: "PasswordHash",
                value: "a417b5dc3d06d15d91c6687e27fc1705ebc56b3b2d813abe03066e5643fe4e74");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "Password",
                value: "pass1");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2,
                column: "Password",
                value: "pass2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 3,
                column: "Password",
                value: "pass3");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4,
                column: "Password",
                value: "pass4");
        }
    }
}
