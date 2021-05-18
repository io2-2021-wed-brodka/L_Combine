using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AddedBikesLimit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BikesLimit",
                table: "BikeStations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 1,
                column: "BikesLimit",
                value: 10);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 2,
                column: "BikesLimit",
                value: 10);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 3,
                column: "BikesLimit",
                value: 10);

            migrationBuilder.UpdateData(
                table: "BikeStations",
                keyColumn: "ID",
                keyValue: 4,
                column: "BikesLimit",
                value: 10);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BikesLimit",
                table: "BikeStations");
        }
    }
}
