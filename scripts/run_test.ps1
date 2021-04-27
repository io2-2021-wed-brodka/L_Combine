if ( $args.Count -ne 2 )
{
    Write-Host "Usage:" $MyInvocation.MyCommand.Name "solution_directory test_file"
    Write-Host "solution_directory - root directory of solution"
    Write-Host "test_file - path to Postman test collection"
    exit 1
}

$solution = $args[0]
$test = $args[1]
$start = $PWD.Path

Write-Host "Preparing backend app and database."
cd $solution
dotnet clean
dotnet build --no-restore
cd Backend\BackendAPI\
dotnet ef database update 0 --no-build --context BackendAPI.Data.DataContext
dotnet ef database update --no-build --context BackendAPI.Data.DataContext

Write-Host "Starting backend."
cd $start
$dotnet = "dotnet"
$dotnet_args = "run -p " + $solution + "\Backend\BackendAPI\BackendApi.csproj"
$backend = Start-Process $dotnet $dotnet_args -PassThru
Start-Sleep 5

Write-Host "Running tests."
newman run $test --insecure

if ( $backend.HasExited -eq 0 )
{
    Write-HOst "Stoping backend."
    Stop-Process $backend.Id
}
